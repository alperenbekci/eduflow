// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract QuestionAnswer {
    struct Question {
        uint id;
        address asker;
        string content;
        uint answerCount;
        bool resolved;
    }

    struct Answer {
        uint id;
        address responder;
        string content;
    }

    mapping(uint => Question) public questions;
    mapping(uint => Answer[]) public answers;

    uint public questionCount;

    event QuestionAdded(uint id, address asker, string content);
    event AnswerAdded(uint questionId, uint answerId, address responder, string content);

    function addQuestion(string memory _content) external {
        questionCount++;
        questions[questionCount] = Question(questionCount, msg.sender, _content, 0, false);
        emit QuestionAdded(questionCount, msg.sender, _content);
    }

    function addAnswer(uint _questionId, string memory _content) external {
        require(_questionId > 0 && _questionId <= questionCount, "Invalid question ID");
        require(!questions[_questionId].resolved, "Question is already resolved");

        answers[_questionId].push(Answer(answers[_questionId].length, msg.sender, _content));
        questions[_questionId].answerCount++;
        emit AnswerAdded(_questionId, answers[_questionId].length, msg.sender, _content);
    }
}
