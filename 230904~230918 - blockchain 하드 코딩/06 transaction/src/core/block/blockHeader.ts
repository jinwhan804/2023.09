import { IBlock, IBlockHeader } from "@core/interface/block.interface";

class BlockHeader implements IBlockHeader {
    version: string;
    height: number;
    timestamp: number;
    previousHash: string;
    constructor(_previousBlock : IBlock){
        // 블록을 생성할때 이전 블록의 정보가 필요하다
        // 이전블록의 해시나 높이나
        this.version = BlockHeader.getVersion();
        this.timestamp = BlockHeader.getTimestamp();
        this.height = _previousBlock.height + 1;
        this.previousHash = _previousBlock.hash;
    }

    static getVersion(){
        return "1.0.0"
    }

    static getTimestamp(){
        return new Date().getTime();
    }
}

export default BlockHeader;