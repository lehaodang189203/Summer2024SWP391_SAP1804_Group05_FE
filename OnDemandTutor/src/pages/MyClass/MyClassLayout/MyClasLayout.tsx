import NavMyServiceRequest from "../../../components/NavMyServiceRequest";
import MyClass from "../MyClass";

function MyClasLayout() {
    return (<>
        <div className='w-4/5'>
        <NavMyServiceRequest />
        <div className=' border-2 shadow-xl'>
          <MyClass />
        </div>
    </div>
    </>  );
}

export default MyClasLayout;