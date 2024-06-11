import SpinningSeal from "../../assets/images/spinning_seal.gif";

export default function NotFoundPage() {
    return (
        <>
            <div className=" flex flex-col justify-center items-center pt-10 ">
                <img src={SpinningSeal} className=" rounded-xl "></img>
                <p className=" font-bold pt-5 text-4xl ">
                    404 - Page not found
                </p>
                <p>
                    Het ziet er naar uit dat de pagina die u probeert te
                    bezoeken niet beschikbaar is.
                </p>
                <p>Neem deze draaiende zeehond als troost :)</p>
            </div>
        </>
    );
}
