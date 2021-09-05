import { STMTask, StateTransitionMap } from "../src/stmtask";

describe("A state-machine based task", () => {

    it('an undefined state machine should throw if tries to take a turn', () => {
        var stm = new STMTask({
            priority:0,
            initial_state:'none',
            states: new  Map<any,any>()
        });
        expect(() => {stm.take_turn()}).toThrow();
        expect(stm.aborted).toBeTrue();
        expect(stm.active).toBeFalse();
        expect(stm.complete).toBeFalse();
    });
    it('an new state machine should be active, incomplete and not aborted', () => {
        var stm = new STMTask({
            priority:0,
            initial_state:'none',
            states: new  Map<any,any>()
        });
        expect(stm.complete).toBeFalse();
        expect(stm.aborted).toBeFalse();
        expect(stm.active).toBeTrue();
    });
    it('taking a turn calls the current states function' , () => {
        var states = new StateTransitionMap();
        states.set('initial', () =>{
            return [ false, 'next'];
        });
        states.set('next', () =>{
            return [ true, 'done'];
        });
        var stm = new STMTask({
            priority:0,
            initial_state:'initial',
            states
        });
        stm.take_turn();
        expect(stm.state).toBe('next');
        expect(stm.complete).toBeFalse();
        expect(stm.aborted).toBeFalse();
        expect(stm.active).toBeTrue();
        stm.take_turn();
        expect(stm.state).toBe('done');
        expect(stm.complete).toBeTrue();
        expect(stm.aborted).toBeFalse();
        expect(stm.active).toBeFalse();
    });
} );