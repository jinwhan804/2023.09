import Strategy from "./strategy/strategy";


class LottoController{
    constructor(private readonly strategy : Strategy){}

    setup(type : number){
        let arr = {
            box : []
        }

        this.strategy.NumberSelector(type, arr)
    }
}

export default LottoController;