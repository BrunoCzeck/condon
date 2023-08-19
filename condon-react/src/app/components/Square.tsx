/* 

const Square = () => {
    return (
        <div className="w-52 h-52 bg-orange-700 text-white">
            Texto qualquer
        </div>
    );
}

export default Square; 

*/

// Utilizo export default quando queiro exportar a pagina inteira.
// Caso eu queira exportar apenas um componente posso usar export no inicio da function exemplo abaixo


export const Square = () => {
    return (
        <div className="w-52 h-52 bg-orange-700 text-white">
            Texto qualquer
        </div>
    );
}

export const Circle = () => {
    return (
        <div className="w-52 h-52 bg-orange-700 text-white rounded-full">
            Texto qualquer
        </div>
    );
}