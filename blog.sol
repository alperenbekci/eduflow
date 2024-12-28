// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract QnAPlatform {
    
    struct Question {
        uint256 id;
        address author;
        string name;
        string title;
        string detail;
        bool isAnswered;
        uint256 upvotes;
    }

    struct Answer {
        uint256 id;
        uint256 questionId;
        address author;
        string content;
        uint256 upvotes;
    }

    uint256 private nextQuestionId = 1;
    uint256 private nextAnswerId = 1;

    mapping(uint256 => Question) public questions;
    mapping(uint256 => Answer[]) public answers;

    event QuestionCreated(uint256 id, address author, string title);
    event AnswerSubmitted(uint256 questionId, uint256 answerId, address author);
    event QuestionUpvoted(uint256 id, uint256 upvotes);
    event AnswerUpvoted(uint256 id, uint256 upvotes);
    event QuestionAnswered(uint256 id);

    function askQuestion(string memory _name, string memory _title, string memory _detail) public {
        questions[nextQuestionId] = Question({
            id: nextQuestionId,
            author: msg.sender,
            name: _name,
            title: _title,
            detail: _detail,
            isAnswered: false,
            upvotes: 0
        });
        emit QuestionCreated(nextQuestionId, msg.sender, _title);
        nextQuestionId++;
    }

    function answerQuestion(uint256 _questionId, string memory _content) public {
        require(questions[_questionId].id != 0, "Question does not exist");
        answers[_questionId].push(Answer({
            id: nextAnswerId,
            questionId: _questionId,
            author: msg.sender,
            content: _content,
            upvotes: 0
        }));
        
        questions[_questionId].isAnswered = true;
        emit AnswerSubmitted(_questionId, nextAnswerId, msg.sender);
        nextAnswerId++;
        emit QuestionAnswered(_questionId);
    }

    function upvoteQuestion(uint256 _questionId) public {
        require(questions[_questionId].id != 0, "Question does not exist");
        questions[_questionId].upvotes++;
        emit QuestionUpvoted(_questionId, questions[_questionId].upvotes);
    }

    function upvoteAnswer(uint256 _questionId, uint256 _answerId) public {
        require(questions[_questionId].id != 0, "Question does not exist");
        Answer[] storage ansList = answers[_questionId];
        bool found = false;
        for (uint256 i = 0; i < ansList.length; i++) {
            if (ansList[i].id == _answerId) {
                ansList[i].upvotes++;
                emit AnswerUpvoted(_answerId, ansList[i].upvotes);
                found = true;
                break;
            }
        }
        require(found, "Answer does not exist");
    }

    function getAnswers(uint256 _questionId) public view returns (Answer[] memory) {
        return answers[_questionId];
    }
}

