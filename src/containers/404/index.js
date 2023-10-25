import React from 'react'
import { Link } from 'react-router-dom'

export const NotFound = () =>
    (
        <div className="bg-main font-avenir not-found-wrap pt-5">
            <div className="container text-center">
                <div className="row justify-content-center">
                    <div className="col-xl-6 col-md-7 col-sm-10 col-12">
                        <div className="font-avenir-light fs-38 mb-3">404 - Página não encontrada.</div>
                        <Link to="/">Página inicial.</Link>
                    </div>
                </div>
            </div>
        </div>
    )