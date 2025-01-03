import './App.css'
import ExpandableText from './components/ExpandableText';

function App() {
  return (
    <ExpandableText maxChar={50}>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
      Nam semper elit eget lorem interdum commodo. 
      Pellentesque volutpat eu purus non lacinia. 
      Vestibulum venenatis sem ex, et gravida risus accumsan ornare. 
      Curabitur dui sapien, semper sit amet massa laoreet, pretium finibus metus. 
      Integer nisl mi, sollicitudin id diam quis, vestibulum rutrum risus. 
      Aenean at lectus sed elit rutrum ultrices. Integer at justo semper, 
      ornare velit at, pharetra sem. Donec sed purus eleifend, dictum sem at, tincidunt metus. 
      Duis tortor velit, finibus vel massa nec, lobortis varius quam. Duis auctor non dui in tincidunt. 
      Aenean accumsan dui risus, a finibus augue fermentum nec. Morbi in iaculis tortor.
    </ExpandableText>
  );
}

export default App
