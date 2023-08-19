import {Square, Circle} from '@/app/components/Square';
import { Person } from '@/app/components/ImgCompo'
function Page(){
  return (
    <div>
      <h1>Teste</h1>
      <h1>Teste2</h1>
      <Person
        name="Elon Musk"
        img= "https://cdn.jornaldebrasilia.com.br/wp-content/uploads/2022/11/04084732/skynews-elon-musk_5780923.jpg"
        roles={['CEO Tesla', 'CEO Twitter', 'CEO SpaceX']}
      />
      <Square />
      <Circle />
    </div>
  );
}

/* 
# Array Function #

const Page = () => {
  return (
    <div>
    <h1>Teste</h1>
    <h1>Teste2</h1>
  </div>
  );
} 
*/

export default Page;