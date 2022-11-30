import React from 'react'
import { IGameList } from 'src/types'
import { GameItem } from 'src/app/components/GameItem'

export const GameList = ({ title, gameIDs, games }: IGameList) => {
    return (
        <div>
            <p className='game-list-title'>{title}</p>
            <div className='games'>
                {gameIDs.map((id: string) => {
                    return <GameItem key={id} imageURL={games[id]?.image} title={games[id]?.title} />
                })}
            </div>
        </div>
    )
}