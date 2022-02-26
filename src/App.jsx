import { createEffect } from 'solid-js';
import { gsap } from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

function App() {
    gsap.registerPlugin(ScrollTrigger);
    createEffect(() => {
        console.clear();

        const svg = document.querySelector('#svg');
        const img = document.querySelector('#img');
        const circle = document.querySelector('#circle');
        const content = document.querySelector('#content');
        const border = document.querySelector('#border');
        const pad = 4;

        console.log('svg', svg);
        console.log('img', img);
        console.log('circle', circle);
        console.log('content', content);

        let radius = +circle.getAttribute('r');
        let imgWidth, imgHeight;

        gsap.set(img, {
            scale: 1 / 3,
            xPercent: -50,
            yPercent: -50,
        });

        gsap.set(border, {
            scale: 1,
        });

        var tl = gsap
            .timeline({
                scrollTrigger: {
                    trigger: border,
                    start: 'top center',
                    end: 'bottom bottom',
                    scrub: 0.2,
                },
                defaults: {
                    duration: 1,
                },
            })
            .to(border, {
                scale: 3,
            })
            .to(
                circle,
                {
                    attr: {
                        r: () => radius,
                    },
                },
                0
            )
            .to(
                img,
                {
                    scale: 1 / 3,
                },
                0
            )
            .to(
                '#whiteLayer',
                {
                    alpha: 0,
                    ease: 'power1.in',
                    duration: 1 - 0.25,
                },
                0.25
            );

        window.addEventListener('load', init);
        window.addEventListener('resize', resize);

        function init() {
            imgWidth = img.naturalWidth;
            imgHeight = img.naturalHeight;

            resize();
        }

        function resize() {
            tl.progress(0);

            const r = svg.getBoundingClientRect();
            const rectWidth = r.width + pad;
            const rectHeight = r.height + pad;

            const rx = rectWidth / imgWidth;
            const ry = rectHeight / imgHeight;

            const ratio = Math.max(rx, ry);

            const width = imgWidth * ratio;
            const height = imgHeight * ratio;

            const dx = rectWidth / 2;
            const dy = rectHeight / 2;
            radius = Math.sqrt(dx * dx + dy * dy);

            gsap.set(img, { width, height });

            tl.invalidate();

            ScrollTrigger.refresh();
        }
    });

    return (
        <>
            <div class="min-h-screen bg-black flex flex-col justify-center relative overflow-hidden sm:py-12">
                <div class="container mx-auto w-700 mt-294 text-center">
                    <a class="text-white text-8xl">
                        Make your apps collaborative
                    </a>
                    <div class="pt-8">
                        <button class="bg-white py-4 px-6 rounded-full">
                            Get started
                        </button>
                        <button class="text-white py-4 px-6">
                            Documentation
                        </button>
                    </div>
                    <div class="mt-72">
                        <a class="text-white text-3xl">
                            Presence enables you to build scalable real-time
                            collaborative apps in just a few minutes
                        </a>
                    </div>
                </div>
                <div
                    class="border-solid border-blue-800 border-2 border-b-0 rounded-3xl shadow-5xl w-1000 mx-auto justify-center relative mt-294"
                    id="border"
                >
                    <div
                        className="text-center fixed top-1/2 left-1/2"
                        id="img"
                    >
                        <div className="text-gray-600 text-7xl font-thin">
                            Isn't this cool?
                        </div>
                        <div className="text-white mt-6">
                            💡 Share the link below with your friends - they'll
                            appear here
                        </div>
                        <div className="text-white mt-8 inline-block border p-1 rounded-md bg-gray-900">
                            https://presence.run/#cool{' '}
                            <span className="border rounded-md px-2 py-1">
                                Copy
                            </span>
                        </div>
                    </div>
                    <svg id="svg" className="rounded-3xl">
                        <defs>
                            <mask id="mask">
                                <rect
                                    width="100%"
                                    height="100%"
                                    fill="white"
                                ></rect>
                                <circle
                                    id="circle"
                                    cx="50%"
                                    cy="50%"
                                    r="60"
                                    fill="black"
                                ></circle>
                            </mask>
                        </defs>
                        <rect
                            id="whiteLayer"
                            width="100%"
                            height="100%"
                            fill="black"
                        ></rect>
                        <rect
                            width="100%"
                            height="100%"
                            fill="black"
                            mask="url(#mask)"
                        ></rect>
                    </svg>{' '}
                    <div class="h-1500" id="content"></div>
                </div>
                {/* <div className="border-solid border-blue-800 border-2 rounded-3xl shadow-5xl w-700 h-48 mx-auto mt-294"></div> */}
                {/* <div className="mx-auto text-center mt-294">
                    <div className="text-gray-600 text-7xl font-thin">
                        Isn't this cool?
                    </div>
                    <div className="text-white mt-6">
                        💡 Share the link below with your friends - they'll
                        appear here
                    </div>
                    <div className="text-white mt-8 inline-block border p-1 rounded-md bg-gray-900">
                        https://presence.run/#cool{' '}
                        <span className="border rounded-md px-2 py-1">
                            Copy
                        </span>
                    </div>
                </div> */}
                <div className="text-white pl-32">
                    <div className="text-3xl">
                        Productivity that's never <br /> experienced before
                    </div>
                    <div className="text-5xl mt-48">
                        Complex engineering.
                        <br />
                        Condensed to 5 lines.
                    </div>
                    <div className="text-7xl mt-72">
                        Cutting edge.
                        <br />
                        <br />
                        And it's edge-native
                        <br />
                        <br />
                        It's robust.
                        <br />
                        scalabel.
                        <br />
                        battle-tested
                    </div>
                    <div className="mt-64">
                        Presence's roots can traced back to YoMo - an
                        <br />
                        open-source serverless streaming framework built to
                        <br />
                        handle mission-critical loT workloads
                    </div>
                </div>
                <div className="container mx-auto justify-center text-white text-center w-700 mt-294">
                    <div className="text-5xl">Go ahead,make your app</div>
                    <div className="text-8xl">intoxicatingly addictive</div>
                    <div className="text-5xl mt-145">
                        Let your users unlock next-level productivity
                    </div>
                </div>
                <div className="w-screen text-200 bg-gradient-to-r from-blue-200 via-blue-700 to-blue-300 bg-clip-text text-transparent mt-94 text-center">
                    robust. scalable
                </div>
                <div className="text-4xl text-white text-center">
                    Complex engineering.
                    <br />
                    Condensed
                </div>
                <div>
                    Cutting dege.
                    <br />
                    On the edge.
                    <br />
                    <br />
                    It's robust.
                    <br />
                    scalcble.
                    <br />
                    battle-tested
                </div>
                <div className="text-white pl-32">
                    Presence's roots can be traced back to YoMo - an open-source
                    serverless streaming framework built to handle
                    mission-critical loT workloads.YoMo is used by
                </div>

                <div class="maskBottom h-150 z-50"></div>
            </div>
            <footer className="bg-black text-white py-12 pl-24">
                <div className="text-5xl">Go ahead,make your app</div>
                <div className="text-7xl">intoxicatingly addictive</div>
                <div class="pt-8">
                    <button class="bg-white text-black py-4 px-6 rounded-full">
                        Get started
                    </button>
                    <button class="py-4 px-6">Documentation</button>
                </div>
            </footer>
        </>
    );
}

export default App;
