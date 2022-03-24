import React, {Suspense,useEffect,useContext} from 'react'
import IndexHome from './IndexHome';
import ColumnsHome from './ColumnsHome';
import AnnounceAndTokenomics from './AnnounceAndTokenomics';
import config from '../../utils/config'
const HomeScreen = (  ) => {
  useEffect(() => {
    console.log();
    return () => {
    
    }
  }, [])
    return(
  <>
  <div className="m-auto max-w-6xl p-12">
     <IndexHome />
    <ColumnsHome />
    <AnnounceAndTokenomics/>
  
    </div>
    </>
  );
}
export default HomeScreen
