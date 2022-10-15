import logo from './logo.svg';
import './App.css';
import Card from './components/Card';
import { useState } from 'react';
import { useEffect } from 'react';

export default function App() {
  const [cards, setCards] = useState([])
  const [compared_card, setComparedCard] = useState(null)
  const [first_enter, setFirstEnter] = useState(true)
  const isPrime = (num) => {
    for ( var i = 2; i < num; i++ ) {
      if ( num % i === 0 ) {
          return false;
      }
    }
    return true;
  }
  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      const temp = array[i]
      array[i] = array[j]
      array[j] = temp;
    }
  }
  const initialize = (n) => {
    var arr = [{id: 2, number: 2, show: true, couple_found:false},{id: 2*100, number: 2, show: true, couple_found:false}]
    for ( var i = 3; arr.length < n; i+=2 ) {
        if ( isPrime(i) ) {
            arr.push({id: i, number: i, show: true, couple_found:false})
            arr.push({id: i*100, number: i, show: true, couple_found:false})
        }
    }
    shuffleArray(arr);
    setCards([...arr]);
  }
  const clickOnCard = (card) => {
      if(first_enter) return;
      if(card.couple_found || card.show) return;
      if(compared_card) {
          if(card.id == compared_card.id) {
              card.show = false
              setComparedCard(null)
          } else if(card.number == compared_card.number) {
              card.show = true
              let c_card = compared_card
              setComparedCard(null)
              const timer = setTimeout(() => {
                card.couple_found = c_card.couple_found = true
                cards.map((card_item) => {
                  if(card_item.id == card.id) card_item.show = true
                  if(card_item.id == c_card.id) card_item.show = true
                })
                setCards([...cards])
                clearTimeout(timer)
  
              }, 1000);
          } else {
            let c_card = compared_card
            card.show = true
            setComparedCard(null)
            const timer = setTimeout(() => {
              card.show = c_card.show = false
              cards.map((card_item) => {
                if(card_item.id == card.id) card_item.show = false
                if(card_item.id == c_card.id) card_item.show = false
              })
              setCards([...cards])
              clearTimeout(timer)

            }, 1000);
          }
      } else {
        card.show = true
        setComparedCard(card)
      }
  }
  useEffect(() => {
    const timer = setTimeout(() => {
      setFirstEnter(false)
      cards.map((card) => {
        card.show = false
      })
      setCards([...cards])
    }, 5000);
    return () => clearTimeout(timer);
  }, [])

  return (
    <div className='wrapper'>
        <h1 className="header">Mahjong</h1>
        {cards.length == 0 ? initialize(32) :
        <div className='wrapper-cards'>
            {cards.map((card) => (
              <Card card={card} key={card.id} clickOnCard={clickOnCard} first_enter={first_enter}/>
            ))}
        </div>
        }
    </div>
  );
}
