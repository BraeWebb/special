# Egress
This repository contains the code for Egress, an administrative tools portal, designed for use by academics and other staff involved in running university courses. Egress is made up of three primary tools, described below.

## Investigate
MoSS is a tool developed by Stanford (https://theory.stanford.edu/~aiken/moss/) which takes submissions of coding-style assignments and generates a measure of the similarity of the code produced (within the cohort of assignments submitted to it). MoSS submissions are made to the Stanford servers via command line, with academics using the tool often amassing a collection of bash scripts to aid them in checking their programming assignments for collusion.

Investigate is designed to make this process more user-friendly (as academics often don't have substantial experience with a command line interface) by providing a web portal for submitting jobs to the Stanford MoSS servers.

## Allocate
Allocate is a staff allocation tool designed to assist course coordinators in producing a reasonable allocation of course staff (such as tutors) to the available course hours. This allocation needs to be based on a number of factors, including staff availability, preferences about contiguous hours and max hours in a week, and whether the given staff are junior (often requiring supervision of some sort) or senior.

Allocate takes this information about staff availability and other requirements, and uses Google OR-Tools, a software suite which tackles optimisation problems (https://developers.google.com/optimization). A frontend exists for this, however the backend Allocate software can be used independently, and is fully functional.

## Floodgate
Floodgate is an online queue, designed to allow students with questions during course contact hours to get help. The queuing system prioritises students based on whether they are signed onto the currently running session, how long they have been waiting in the queue, and how many questions they have asked that day already. It is also easily configurable, allowing options such as a dual-queue system (where there is a separate queue for long and short questions).

## Getting Started
A wiki has been produced to assist in getting these tools up and running. It can be found at https://github.com/BraeWebb/special/wiki.
