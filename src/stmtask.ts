import { ITask } from "./brain";

//export type StateTransitionMap = Map<string, () => [boolean, string]>;
export class StateTransitionMap extends Map<string, () => [boolean, string]> {
    constructor() {
        super();
    }
};
export class NoSuchState extends Error {}
export interface StateMachineOptions {
    priority: number;
    initial_state: string;
    states: StateTransitionMap;
}
export class STMTask implements ITask {
    public priority: number;
    public complete: boolean;
    public state: string;
    public active: boolean;
    public aborted: boolean;
    private machine: StateTransitionMap;
    constructor(options: StateMachineOptions) {
        this.priority = options.priority;
        this.state = options.initial_state;
        this.machine =  options.states;
        this.complete = false;
        this.active = true;
        this.aborted = false;
    }
    private abort() : void {
        this.aborted = true;
        this.active = false;
    }
    public take_turn() : boolean {
        const statefn = this.machine.get(this.state);
        if (typeof(statefn) != 'function') {
            this.abort();
            throw new NoSuchState(this.state);
        }
        const nxt_vec = statefn();
        this.complete = nxt_vec[0];
        this.state = nxt_vec[1];
        if (this.complete) {
            this.active = false;
        }
        return true;
    }
}