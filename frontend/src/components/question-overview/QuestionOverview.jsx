import React, { useEffect, useState } from "react";
import ApiService from "../../services/ApiService";

export default function QuestionOverview() {
    const [questions, setQuestions] = useState();
    //const { id } = useParams();

    useEffect(() => {
        ApiService.get("vragen").then((response) =>
            setQuestions(response.data)
        );
    }, []);

    return <div>Test</div>
}