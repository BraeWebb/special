/**
 * Authentication module using UQ Single-Sign On
 *
 * Provides middleware for authentication using an express router
 * and socket.io.
 *
 * This module exports two middleware functions, express and io.
 *
 * The express middleware sets the req.user to be a json object representing
 * the user information from UQSSO. An example format is given below.
 *
 * The socket.io middleware sets the packet.user to be this object.
 *
 * {
 *  email:"s4435400@student.uq.edu.au",
 *  name:"Brae Webb",
 *  lastname:"Webb",
 *  firstname:"Brae",
 *  groups:["labs:csse2002", "labs:csse2002-2019-1"],
 *  type:"Student",
 *  user:"s4435400"
 * }
 *
 * When development mode is activated by setting the environment variable
 * DEV to auth:* it will set the user to a dummy user defined in this
 * file by the constant DUMMY.
 */

const express = require('express');

/* Required authentication module for UQSSO */
const uqsso = require('uqsso');

/** Constant for a dummy user used in development mode */
const DUMMY = {
  email:"s4435400@student.uq.edu.au",
  name:"Sir John Webb",
  lastname:"Webb",
  firstname:"Brae",
  groups:["labs:csse2002", "labs:csse2002-2019-1"],
  type:"Student",
  user:"s44354008"
};

/**
 * Middleware for assigning the dummy user to the req.user.
 */
function dummyAuth(req, res, next) {
  req.user = DUMMY;
  next();
}

/**
 * Wrapper for a socket middleware.
 *
 * Allows the same middleware to be used for an express router and a socket.
 *
 * @param wrapee An express router middleware function.
 * @returns {function(*=, *=): *}
 */
function socketWrapper(wrapee) {
  return (packet, next) => {

    packet.request.cookies = {};
    let cookies = packet.handshake.headers.cookie.split("; ");
    for (let i in cookies) {
      let parts = cookies[i].split("=");
      packet.request.cookies[parts[0]] = parts[1];
    }
    packet.request.next = next;

    let res = express.response;
    res.req = packet.request;

    // error if a socket tries to redirect :(
    res.redirect = function (code, uri) {
      console.debug("Socket attempted to redirect to " + uri);
      next(new Error('Socket attempted redirect to ' + uri));
    };
    // shouldn't be sending on a socket
    res.send = function (data) {};

    return wrapee(packet.request, res, next);
  }
}

// determine the appropriate authentication middleware based on dev mode
let auth;
let debug = process.env.DEV === 'auth:*';
if (!debug) {
  auth = uqsso();
} else {
  auth = dummyAuth;
}

module.exports = {
  "express": auth,
  "io": socketWrapper(auth)
};
