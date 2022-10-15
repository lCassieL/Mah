const Card = ({card, clickOnCard, first_enter}) => {
    return (
        <div onClick={() => clickOnCard(card)} className={card.show ? card.couple_found || first_enter ? 'card card-found' : 'card card-click' : 'card'}>
            {card.show ? card.number : ''}
        </div>
      )
}

export default Card;