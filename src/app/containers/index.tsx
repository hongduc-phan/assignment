import React, { useEffect, useState, useRef } from 'react'

import { IAppState } from 'src/app/types'
import { GameList } from 'src/app/components/GameList'

const APP_STATE = {
    isErrorFetching: false,
    appData: null,
    authorized: false
}

const AUTHORIZED_STATUS_CODE = {
    AUTHORIZED: 201
}

const RECENTLY_PLAYED_ID = 'recently-played'

const DATA_IDS = {
    MAIN: 'main',
    CATEGORIES: 'categories',
    GAMELISTS: 'game-lists',
    GAMES: 'games'
}

const API_URL = 'http://localhost:8082/api'
const PROTECTED_API = '/protected'

export default () => {
    const [state, setState] = useState<IAppState>(APP_STATE)
    const { appData, isErrorFetching, authorized } = state
    const inputRef = useRef('')

    useEffect(() => {
        const fetchData = async () => {
            const resp = await fetch(API_URL)
            const respData = await resp.json()
            setState((prevState: IAppState) => ({ ...prevState, appData: respData }))
        }
        fetchData()
    }, [])

    const handleAuthorizeUser = () => {
        const postProtected = async () => {
            if (appData) {
                const fetchOptions = {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ userId: inputRef.current })
                }
                const resp = await fetch(`${API_URL}${PROTECTED_API}`, fetchOptions)
                setState((prevState: IAppState) => ({ ...prevState, authorized: resp.status === AUTHORIZED_STATUS_CODE.AUTHORIZED }))
            }
        }
        postProtected()
    }

    const handleChangeInputUserID = () => {
        inputRef.current = (document.getElementById("authorize_user_id") as HTMLInputElement)?.value
    }

    const renderApp = () => {
        if (appData) {
            const app = appData[DATA_IDS.MAIN]
            const categories = appData[DATA_IDS.CATEGORIES]
            const catKeys = Object.keys(categories)
            return (
                <>
                    {app ? (
                        <div className='main-container'>
                            <h2 className='categories-title'>{app.categories.join(', ')}</h2>
                            <p>{app.description}</p>

                            {catKeys.map(key => {
                                const cat = categories[key]
                                const gameLists = appData[DATA_IDS.GAMELISTS]
                                const gameIDs = gameLists[cat.id]
                                const games = appData[DATA_IDS.GAMES]
                                return (
                                    authorized || RECENTLY_PLAYED_ID !== cat.id ?
                                    <GameList 
                                        key={cat.id}
                                        title={cat.title} 
                                        gameIDs={gameIDs} 
                                        games={games}
                                    />
                                    : 
                                    <div key={RECENTLY_PLAYED_ID} className='authorize-container'>
                                        <button title='You need to use these values to pass authentication user1, user2, user3, user4' onClick={handleAuthorizeUser}>Need to authorize to unlock this content</button>
                                        <input placeholder='input user id' id='authorize_user_id' ref={inputRef} onChange={handleChangeInputUserID}></input>
                                        {!authorized ? <p>You need to use these values to pass authentication user1, user2, user3, user4</p> : null}
                                    </div>
                                )
                            })}
                            
                        </div>
                    ) : null}
                </>
            )
        }

    }

    return (
        <>
            {isErrorFetching ? 'There something wrong with loading data, please try again ...' : null}
            {!isErrorFetching ? renderApp() : null}
        </>
    )
}