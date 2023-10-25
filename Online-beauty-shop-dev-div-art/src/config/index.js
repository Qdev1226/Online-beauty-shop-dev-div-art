export const API_URL = 'http://visualtotal.com.br' 
export const APIKEY = 'apikey'
export const LIST_MENU = [
            {
                title: 'Minha Conta',
                icon: 'user-icon-grey',
                icon_white: 'user-icon.png',
                svg_icon: 'Minha-conta-black.svg',
                svg_icon_hover: 'Minha-conta-white.svg',
                url: 'profile'
            }, {
                title: 'Lista de desejos',
                icon: 'list-icon-grey',
                icon_white: 'list-icon.png',
                svg_icon: 'Lista-de-desejos-black.svg',
                svg_icon_hover: 'Lista-de-desejos-white.svg',
                url: 'wishlist'
            }, {
                title: 'Vouchers',
                icon: 'vaucher-icon-grey',
                icon_white: 'vaucher-icon.png',
                svg_icon: 'Voucher-black.svg',
                svg_icon_hover: 'Voucher-white.svg',
                url: 'vouchers'
            }, {
                title: 'Créditos',
                icon: 'credits-icon-grey',
                icon_white: 'credits-icon.png',
                svg_icon: 'Créditos-black.svg',
                svg_icon_hover: 'Créditos-white.svg',
                url: 'credits'
            }, {
                title: 'Agendamentos',
                icon: 'book-icon-grey',
                icon_white: 'book-icon.png',
                svg_icon: 'Agendamentos-black.svg',
                svg_icon_hover: 'Agendamentos-white.svg',
                url: 'schedules'
            }, {
                title: 'Produtos comprados',
                icon: 'product-icon-grey',
                icon_white: 'product-icon.png',
                svg_icon: 'Produtos-comprados-black.svg',
                svg_icon_hover: 'Produtos-comprados-white.svg',
                url: 'purchased'
            }, {
                title: 'Notificações',
                icon: 'bell-icon-grey',
                icon_white: 'bell-icon.png',
                svg_icon: 'Notificações-black.svg',
                svg_icon_hover: 'Notificações-white.svg',
                url: 'notifications'
            }, {
                title: 'Revisão e feedback',
                icon: 'doc-icon-grey',
                icon_white: 'doc-icon.png',
                svg_icon: 'Revisão-e-feedback-black.svg',
                svg_icon_hover: 'Revisão-e-feedback-white.svg',
                url: 'feedback'
            }, {
                title: 'Suporte',
                icon: 'support-icon-grey',
                icon_white: 'support-icon.png',
                svg_icon: 'Suporte-black.svg',
                svg_icon_hover: 'Suporte-white.svg',
                url: 'support'
            }
        ]

export const DROP_LIST = [{title: 'Mais relevantes', key: ''}, {title: 'Menor preço', key: 'lowest_price_first'}, {title: 'Maior preço', key: 'highest_price_first'}]
export const DROP_MENU_LIST = [
    {
        title: 'Todos',
        background: 'bg-all',
        type: 'all'
    }, {
        title: 'Produto',
        background: 'bg-green',
        type: 'product'
    }, {
        title: 'Serviço',
        background: 'bg-blue',
        type: 'service'
    }, {
        title: 'Salão',
        background: 'bg-orange',
        type: 'salon'
    }, {
        title: 'Vendedor',
        background: 'bg-brown',
        type: 'vendor'
    }
]
export const NOTIFICATION_TYPE = {
        warning: {
            title: 'Atenção',
            icon: '/assets/icons/notify-attention.png'
        },
        reminder: {
            title: 'Lembrete',
            icon: '/assets/icons/notify-reminder.png'
        },
        appointment: {
            title: 'Reveja',
            icon: '/assets/icons/notify-review.png'
        },
        credits: {
            title: 'Reveja',
            icon: '/assets/icons/notify-credits.png'
        },
        product: {
            title: 'Produto',
            icon: '/assets/icons/notify-products.png'
        },
        gift: {
            title: 'Lembrete',
            icon: '/assets/icons/notify-gift.png'
        }
    }

export const WEEK = {monday: 'Segunda-Feira', tuesday:'Terça-Feira', wednesday: 'Quarta-Feira', thursday: 'Quinta-Feira', friday: 'Sexta-Feira', saturday: 'Sábado', sunday: 'Domingo'}

export const LIGHTBOX_THEME = {
                            container: {
                                    backgroundColor: 'rgba(0,0,0,0.4)',
                                    background: 'rgba(0,0,0,0.4)'
                            },
                            arrow: {
                                fill: '#579a64',
                                borderRadius: '100%',
                                backgroundColor: '#fff',
                                maxHeight: '46px',
                                maxWidth: '46px',
                                minWidth: '46px',
                                transform: 'translateY(37px)',
                                padding: '4px 9px 4px 10px',
                                marginRight: '30px'
                            }
                        }

export const DEFAULT_IMG = {src: '/assets/images/default-image-square-big.png'}
export const MONTH = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro']

export const card_types = [
      {
        name: 'amex',
        pattern: /^3[47]/,
        valid_length: [15]
      }, {
        name: 'diners_club_carte_blanche',
        pattern: /^30[0-5]/,
        valid_length: [14]
      }, {
        name: 'diners_club_international',
        pattern: /^36/,
        valid_length: [14]
      }, {
        name: 'jcb',
        pattern: /^35(2[89]|[3-8][0-9])/,
        valid_length: [16]
      }, {
        name: 'laser',
        pattern: /^(6304|670[69]|6771)/,
        valid_length: [16, 17, 18, 19]
      }, {
        name: 'visa_electron',
        pattern: /^(4026|417500|4508|4844|491(3|7))/,
        valid_length: [16]
      }, {
        name: 'visa',
        pattern: /^4/,
        valid_length: [16]
      }, {
        name: 'mastercard',
        pattern: /^5[1-5]/,
        valid_length: [16]
      }, {
        name: 'maestro',
        pattern: /^(5018|5020|5038|6304|6759|676[1-3])/,
        valid_length: [12, 13, 14, 15, 16, 17, 18, 19]
      }, {
        name: 'discover',
        pattern: /^(6011|622(12[6-9]|1[3-9][0-9]|[2-8][0-9]{2}|9[0-1][0-9]|92[0-5]|64[4-9])|65)/,
        valid_length: [16]
      }
    ];

export const times = ['8:00', '8:30', '9:00', '9:30', '10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00', '17:30', '18:00', '18:30', '19:00', '19:30', '20:00']