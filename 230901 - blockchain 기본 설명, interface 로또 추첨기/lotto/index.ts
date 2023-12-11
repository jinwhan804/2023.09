import LottoController from "./lottoController";
import { FourNumberSelector } from "./strategy/4numbers";
import { SixNumberSelector } from "./strategy/6numbers";
import { EightNumberSelector } from "./strategy/8numbers";
import Strategy from "./strategy/strategy";

const strategy = new Strategy();

strategy.set(4, new FourNumberSelector());
strategy.set(6, new SixNumberSelector());
strategy.set(8, new EightNumberSelector());

const lottoController = new LottoController(strategy);

lottoController.setup(8);