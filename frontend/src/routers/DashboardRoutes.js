import * as React from 'react'
import {Redirect, Route, Switch} from 'react-router-dom'
import Loaded from '../components/loaded';
import FarmsScreen from '../views/Farms/FarmsSreen';
import PoolsScreen from '../views/Pools/PoolsScreen';
import ReferralScreen from '../views/Referral/ReferralScreen';
import Sidebar from '../components/ui/Sidebar';
import PoolsGamesScreen from '../views/PoolsGames/PoolsGamesScreen';
import HomeScreen from '../views/Home/HomeScreen';
import Inventory from '../views/Invetory/Inventory';
import PreSale from '../views/PreSale/Presale';
import Tabs from '../views/Trade/Tabs';
import NewSwap from '../views/Trade/NewSwap';
import Claim from '../views/Trade/Claim';
import GameSwap from '../views/Trade/GameSwap';
import ClaimGame from '../views/Trade/ClaimGame';
const TradeScreen = React.lazy(()=> import ('../views/Trade/TradeScreen'));

const DashboardRoutes = (  ) => {
    return(
  <>
  <React.Suspense fallback={<Loaded />} >
 
<div className=" bg-cover bg-center bg-fixed bg-[#20282a]"
       >
 
    <Sidebar>
    
      <div className=" ">
    <div className="fondo_image">
      <Switch>
      <Route exact path='/trade' component={NewSwap} />           
        <Route exact path='/claim' component={Claim} />               
        <Route exact path='/gameSwap' component={GameSwap} />   
        <Route exact path='/gameClaim' component={ClaimGame} />   

        
        
      <Redirect to="/claim" />
      </Switch>
  
    </div>
      </div>


</Sidebar>
  
</div>

 </React.Suspense>
  </>
  );
}
export default DashboardRoutes
/**
 * <Route exact path='/trade' component={NewSwap} />               
        
<Route exact path="/presale" component={PreSale} />
 * 
 * <Route exact path='/farms' component={FarmsScreen} />
        <Route exact path='/pools' component={PoolsScreen} />
        <Route exact path='/pools-games' component={PoolsGamesScreen} />
        <Route exact path='/referral' component={ReferralScreen} />
        <Route exact path="/inventory" component={Inventory} />
 */