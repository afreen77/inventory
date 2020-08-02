import React from 'react'
import App from 'next/app'
import 'ag-grid-community/dist/styles/ag-grid.css'
import 'ag-grid-community/dist/styles/ag-theme-balham.css'
import 'react-toastify/dist/ReactToastify.css';


class InventoryApp extends App<any> {

  constructor(args) {
    super(args)
  }


  componentDidCatch(error, errorInfo) {
    console.error(error)
    // This is needed to render errors correctly in development / production
    // @ts-ignore
    super.componentDidCatch(error, errorInfo)
  }

  async componentDidMount() {
  }

  render() {
    const { Component, pageProps, router } = this.props
    return (<main>
              <Component {...pageProps} />
            </main>
    )
  }
}

export default InventoryApp
