const RewardItem = ({data}) => {
    return ( 
        <div className="rewarditem">
            <img className="" src={data.imageUrl} alt={data.productName}/>
            <h1 className="text-2xl font-bold text-black">{data.productName}</h1>
            {/* <h1 className="text-2xl font-bold text-primary">{data.productDescription}</h1> */}
            <h1 className="text-2xl font-bold text-primary">{data.costPoints} Points</h1>
            
        </div>
     );
}
 
export default RewardItem;