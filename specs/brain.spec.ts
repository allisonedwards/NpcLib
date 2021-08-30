import { Brain, ITask } from '../src/brain';

describe('A brain ..', () => {
    var brain;
    beforeEach( () =>{
        brain = new Brain();
    }) 
    it('should raise an error if taking a turn it has nothing todo', () =>{
        expect( ()=> {
            brain.take_turn();
        }).toThrow();

    });
    it('should raise an error if taking a turn it has nothing todo is not busy', () =>{
        expect( brain.busy).toBeFalsy();
    });
    it('should be possible to add an item to the queue', () => {
        brain.add_task({
            priority:1,
            arguments:[],
            take_turn: () => false,
        });
        expect(brain.busy).toBeTrue();
    });
    it('should be take_the turn of an item in the queue', () => {
        var done = false;
        brain.add_task({
            priority:1,
            complete:false,
            arguments:[],
            take_turn: () => { done=true; return false},
        });
        brain.take_turn();
        expect(done).toBeTrue();
        expect(brain.busy).toBeTrue();
    });
    it('should be remove items from the queue when complete', () => {
        var done = false;
        brain.add_task({
            priority:1,
            complete:false,
            arguments:[],
            take_turn: () => { done=true; return true},
        });
        brain.take_turn();
        expect(done).toBeTrue();
        expect(brain.busy).toBeFalse();
    });

    it('should be when there are two tasks the highest priority is done LF', () => {
        var done = false;
        brain.add_task({
            priority:1,
            complete:false,
            arguments:[],
            take_turn: () => {  return false},
        });
        brain.add_task({
            priority:100,
            complete:false,
            arguments:[],
            take_turn: () => { done=true; return false},
        });
        brain.take_turn();
        expect(done).toBeTrue();
        expect(brain.busy).toBeTrue();
    });

    it('should be when there are two tasks the highest priority is done HF', () => {
        var done = false;
        brain.add_task({
            priority:100,
            complete:false,
            arguments:[],
            take_turn: () => { done=true; return false},
        });
        brain.add_task({
            priority:1,
            complete:false,
            arguments:[],
            take_turn: () => {  return false},
        });
        brain.take_turn();
        expect(done).toBeTrue();
        expect(brain.busy).toBeTrue();
    });
    it('should not run complete tasks' , () => {
        class T implements ITask {
            public complete = false;
            constructor(public priority: number){}
            public take_turn() {
                this.complete = true;
                return false;
            }
        }
        var a = new T(1);
        var b = new T(0);
        brain.add_task(a);
        brain.add_task(b);
        brain.take_turn();
        expect(a.complete).toBeTrue();
        brain.take_turn();
        expect(b.complete).toBeTrue();
    });
})