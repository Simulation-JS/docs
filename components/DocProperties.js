import DocProperty from './DocProperty';
import { v4 } from 'uuid';

export default function DocProperties({ props, editable = false, setProp = null, deleteProp }) {
  const handleSetProp = (prop, index) => {
    if (setProp) setProp(index, prop);
  };

  return (
    <>
      {props.map((item, index) => (
        <DocProperty
          prop={item}
          key={v4()}
          editable={editable}
          setProp={(e) => handleSetProp(e, index)}
          deleteProp={() => deleteProp(index)}
        />
      ))}
    </>
  );
}
