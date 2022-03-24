
const addToken = async (tokenAddress,islolli)=>{    
    const tokenSymbol = islolli?'LOLLIPOP':'CHOCO';
    const tokenDecimals = 18;
    const tokenImage = islolli?`https://res.cloudinary.com/camicasii/image/upload/v1628462098/sugarswap/lollipop_zbaom4.png`:'https://develop.sugarswap.net/home/choco.svg';

try {
    console.log(process.env.PUBLIC_URL);
  // wasAdded is a boolean. Like any RPC method, an error may be thrown.
  const wasAdded = await window.ethereum.request({
    method: 'wallet_watchAsset',
    params: {
      type: 'ERC20', // Initially only supports ERC20, but eventually more!
      options: {
        address: tokenAddress, // The address that the token is at.
        symbol: tokenSymbol, // A ticker symbol or shorthand, up to 5 chars.
        decimals: tokenDecimals, // The number of decimals in the token
        image: tokenImage, // A string url of the token logo
      },
    },
  })
  .then((success) => {
    if (success) {
      console.log('FOO successfully added to wallet!')
    } else {
      throw new Error('Something went wrong.')
    }
  })
  .catch(console.error)
  ;

  if (wasAdded) {
    console.log('Thanks for your interest!');
  } else {
    console.log('Your loss!');
  }
} catch (error) {
  console.log(error);
}
}

export default addToken;