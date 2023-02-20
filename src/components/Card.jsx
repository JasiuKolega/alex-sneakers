import React from "react";
import ContentLoader from "react-content-loader";

function Card({ 
        id,
        onFavorite,
        imageUrl,
        name,
        price,
        onPlus,
        favorited = false,
        added = false,
        loading = false,
    }) {

    const [isAdded, setIsAdded] = React.useState(added)
    const [isFavorite, setIsFavorite] = React.useState(favorited);

    const onClickPlus = () => {
        onPlus({ id, imageUrl, name, price });
        setIsAdded(!isAdded)
    }

    const onClickFavorite = (obj) => {
        setIsFavorite(!isFavorite);
    }

    return (
        <div className="card">
            {
                loading ? <ContentLoader
                    speed={2}
                    width={155}
                    height={265}
                    viewBox="0 0 155 265"
                    backgroundColor="#f3f3f3"
                    foregroundColor="#ecebeb">
                    <rect x="1" y="0" rx="10" ry="10" width="155" height="155" />
                    <rect x="0" y="167" rx="5" ry="5" width="155" height="15" />
                    <rect x="0" y="187" rx="5" ry="5" width="100" height="15" />
                    <rect x="1" y="234" rx="5" ry="5" width="80" height="25" />
                    <rect x="124" y="230" rx="10" ry="10" width="32" height="32" />
                </ContentLoader> : <>
                    {onFavorite && <div className="favorute unlikedBtn" onClick={onClickFavorite}>
                        <img className="like" width={15} height={15} src={isFavorite ? "/img/liked.png" : "/img/unliked.png"} alt="" />
                    </div>} 
                    <img width={133} height={112} src={imageUrl} alt="" />
                    <h5>{name}</h5>
                    <div className="d-flex justify-between align-center">
                        <div className="d-flex flex-column">
                            <span>Цена: </span>
                            <b>{price}</b>
                        </div>

                        {onPlus && (<img className="plus" width={15} height={15} src={isAdded ? "/img/bought.png" : "/img/plus.png"} alt="" onClick={onClickPlus} />)}
                        

                    </div>
                </>
            }


        </div>
    );
}

export default Card;