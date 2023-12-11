export interface Result<R>{
    isError : false;
    value : R;
}

export interface Faillure<E>{
    isError : true;
    value : E;
}

//Failable  Result도 될수있고 Faillure도 될수 있는데
// Failable<string, number> = Result<string> | Faillure<number>
export type Failable<R,E> = Result<R> | Faillure<E>;

