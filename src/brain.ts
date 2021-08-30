import PriorityQueue  from "ts-priority-queue";

export interface ITask {
    /**
     * Do one turns worth of action on this task
     * 
     * @returns true if task complete and can be dequeued.
     */
    take_turn() : boolean;
    /**
     * How important  this tasks is to the brain,
     * higher priority tasks are completed first
     */
    priority: number;
    /**
     * Is this task complete. Test before, running a turn.
     * task which only complete after a turn can leave 
     * this as always false
     */
    complete: boolean;
//    arguments: Array<any>;
}

export class NothingTodo{}

export class Brain {
    /**
    Tasks awaiting the NPC getting around to do them
    are held in a priority queues so they get done most urgent 
    first. 
    */
    private todo : PriorityQueue<ITask>;
    /**
    Task in-progress are held in a stack, and are done
    in strict LIFO order. This allows a Task to call
    another as sub function of it's behaviour.
    */
    private doing : Array<ITask>;
    
    //Interruption policy ?
   
    constructor() {
        this.doing = [];
        this.todo= new PriorityQueue({
             comparator: (a :ITask, b :ITask ) => b.priority - a .priority
        })
    }
    public take_turn() {
        // Search for an incomplete task to work on.
        while( (this.doing.length == 0) || this.doing[0].complete ) {
            // remove the complete task (if any)
            this.doing.shift();
            if (!this.busy) {
                // If nothing todo throw
                throw new NothingTodo();
            } else {
                // Refresh the current tasks if necessary
                // - this can be 0, if doing's length was
                // greater than 1 on entry.
                if (this.doing.length == 0) {
                    this.doing.push(this.todo.dequeue());
                }
            }
        }
        if (this.doing[0].take_turn()) {
            this.doing.shift();
        }

    }
    /**
     * Add a new task for this NPC to complete soon.
     * @param new_task New task to add to the todo list for this brain
     */
    public add_task(new_task: ITask) {
        this.todo.queue(new_task);
    }
    get busy() {
        return !!(this.doing.length + this.todo.length);
    }
}
