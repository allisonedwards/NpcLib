# NPCLib - A library for managing NPC Actions

## Overview

The aim of this libraries is a generic framework for NPC AI 
systems. It implements a priority queue of task the NPC wishes
to achive and supports interruptions and and resuming the task.

Each 'task' is a object which tracks the task's progress, and
maintains internal state, but NOT game-world state. Each turn the 
task can generate actions for the NPC and manipulate it's state.

The most likely task type you will use it the State Machine Task.


## State Machine Tasks
A state-machine task consists of a state-machine which produces
of actions which the NPC will run, but new tasks and interruptions drive the choice of
the current state-machine.


#  Acknowledgements

Inspired by this paper 
http://publications.lib.chalmers.se/records/fulltext/245348/245348.pdf 
and others by 
by
Gustav Grund Pihlgren
Martin Nilsson
Mikael Larsson
Oskar Olsson
Tobias Foughman
Victor Gustafsson".
