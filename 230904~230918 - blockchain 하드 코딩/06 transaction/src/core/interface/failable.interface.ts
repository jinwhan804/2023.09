export interface Result<R> {
    isError : false;
    value : R;
}

export interface Faillure<E> {
    isError : true;
    value : E;
}

export type Failable<R, E> = Result<R> | Faillure<E>;

// Failable<undefined, string>

// {isError : false , value : undefined}
// {isError : true , value : string}
//  : Result<String>
//  {isError : false , value : "원하는 타입을 받을수 있겠죠"}
// let a = (a,b)=>{
//     console.log(a,b)
// }
// a("asdf","Sfwesfs")


