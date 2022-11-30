import React from 'react'
import { IGameItem } from 'src/types'

export const GameItem = ({ imageURL, title }: IGameItem) => {
    return (
        <div className='game-item'>
            <div className='img-container'><img src={imageURL} title={title} /></div>
            <div className='desc'>{title}</div>
        </div>
    )
}