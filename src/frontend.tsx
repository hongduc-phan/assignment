import { StrictMode, useEffect, useState } from "react"
import { createRoot } from "react-dom/client"
import App from 'src/app/containers'
import "src/styles.css"

const rootElement = document.getElementById("root") as Element
const root = createRoot(rootElement)
root.render(
    <StrictMode>
        <App />
    </StrictMode>
)