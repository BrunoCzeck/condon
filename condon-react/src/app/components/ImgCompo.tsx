type Props = {
  name: string,
  img: string,
  roles: string[]
}

export const Person = (props:Props) => {
/*   const data = {
    name:"Elon Musk",
    img:"https://cdn.jornaldebrasilia.com.br/wp-content/uploads/2022/11/04084732/skynews-elon-musk_5780923.jpg",
    roles: ['CEO Tesla', 'CEO Twitter', 'CEO SpaceX']
  } */

  
     return (
      <>
            <h1>{props.name}</h1>      
            <img 
            src={props.img} 
            alt={props.name} 
            className="w-40"
            />
      </>  
    );
} 