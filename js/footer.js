import { LitElement, html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js';

export class Footer extends LitElement {
    static styles = css`

        .footer-section {
        width: 100%;
        position: fixed;
        top: 95%;
        /* left: 50%;
        transform: translateX(-50%); */
        left: 0;
        right: 0;
        margin: auto; /* Auto margin centers the element */
        /* bg color, height and border ensure that the line break is filled with given colour */
        background-color: rgba(134, 134, 134, 88);
        height: 1px;
        border: 0;
        }

        footer {
        width: 100%;
        padding: 6px 24px;
        bottom: 0;
        height: 4%;
        left: 0;
        position: fixed;
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        box-sizing: border-box;
        font: 0.95em "Noto Sans", sans-serif;
        }

        /* * matches the svg icon colour */
        .footer-declaration {
        color: rgba(134, 134, 134, 88);
        }

        .footer-icons {
        display: flex;
        gap: 20px;
        }

        .footer-icon {
        width: 23.143px;
        height: 22.645px;
        }

    `

    render() {
        return html`

            <hr class="footer-section" />
            <footer>
            <div class="footer-declaration">
                This product isn't affiliated with or endorsed by Grinding Gear Games in any way.
            </div>

            <div class="footer-icons">
                <a href="https://github.com/dhruv-ahuja" target="_blank" rel="noopener">
                <img class="footer-icon" src="media/github.svg" />
                </a>

                <a href="https://x.com/dhruvahuja_" target="_blank" rel="noopener">
                <img class="footer-icon" src="media/twitter.svg" />
                </a>
            </div>
            </footer>

        `
    }
}

customElements.define("custom-footer", Footer)