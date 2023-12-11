export interface Result<R>{
    isError : false;
    value : R;
}

export interface Faillure<E>{
    isError : true;
    value : E;
}

export type Failable<R,E> = Result<R> | Faillure<E>;

