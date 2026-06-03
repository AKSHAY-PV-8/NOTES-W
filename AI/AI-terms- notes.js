 => LLM (large language model) ;- a neural network that is trained 
 to predicet the next term of and input sequence 



? How LLM predict the output? 

 => tokenixation :- spliting input in to tokes
 => vetorization :-  meaning that derived is repersented by vectors 
 => attention :- predict the context by looking nearby words 
    example:- tasty apple, apple's revenuew 
        apples has different meaning so , meaning determined by looking 
        nearest word (nearby contextual vector)


? How LLM train to predict next response? 

 => self-supervised learing => it like taring form the input sequence itself 
    example:- 5,4,3,2
        we know that after the 2 it is 1
    this is self-supervised learing 


? Neural Networks ? 

=> The Big Picture

When you ask ChatGPT a question:

Question
   ↓
Neural Network
   ↓
Answer

The neural network is the mathematical system that learns patterns from data.

A Single Artificial Neuron

Imagine you're deciding whether to go outside.

Factors:

Weather
Temperature
Rain

You mentally combine these factors and make a decision.

An artificial neuron does something similar:

Inputs
   ↓
Weighted Calculation
   ↓
Output

Example:

Temperature = 30
Rain = 0
Wind = 5

↓

Go Outside = Yes
Neural Network Structure

A neural network contains many neurons organized into layers.

Input Layer
      ↓
Hidden Layer
      ↓
Hidden Layer
      ↓
Output Layer

For example:

Photo
  ↓
Neural Network
  ↓
"Cat"

? Transformer
=> like input is passing through an algorithm like that 
    flow;- 
        input pass through a attention block the pass through a neural network and 
        predicts multiple outputs, then that outputs is mass through another 
        attention block then repeat same steps 


? fine-tuning 
=> the base model is trained to answering in a specific way
-pass through multiple questions

? few-short prompt 
=> examples in prompt 

? RAG(Retrival Augmented Generation)
=> pass document along with the input and examples(few-short prompt)
    to LLM model 

    -examples helps to get format 
    -document helps to get context 


? Vector DB 
=> A Vector Database is a database designed to store 
    and search embeddings (vectors) efficiently.

    AI converts text into numbers.

    Example:
    "cat" → [0.21, -0.8, 0.44, ...]
    "dog" → [0.19, -0.75, 0.48, ...]
    These numbers are called: Embeddings (vectors)
    Texts with similar meaning produce vectors close together.

? Model context protocol 

=> The Model Context Protocol (MCP) is an open protocol for 
connecting AI assistants and language models to external tools, 
data sources, and applications in a standardized way.


Example workflow

 An MCP-enabled coding assistant might:
        Discover a GitHub MCP server
        Ask what tools are available
        Invoke:
        list_pull_requests
        get_issue
        create_branch
        Use returned structured data in the conversation
 All without custom glue code.

? Context ENgineering? 

 Context Engineering is the practice of designing, selecting, organizing,
 and delivering the right information to an AI model so it can perform
 a task effectively.

    Many people focus on prompt engineering, but in modern AI systems, 
    context engineering is often more important.

Simple Definition

    Instead of asking:
    "How do I write a better prompt?"

    Context engineering asks:
    "How do I give the model all the information it needs at the 
    right time?"

? Agents 

=> Normal AI Application
    You send a prompt:

    User
    ↓
    LLM
    ↓
    Answer

    Example:

    const response = await groq.chat.completions.create({
    messages: [
        {
        role: "user",
        content: "Generate test cases for login page"
        }
    ]
    });

    The model only generates text.

=> AI Agent

    An agent can:

    Think about the task
    Decide what to do next
    Use tools
    Gather information
    Execute actions
    Return a result
    User Request
        ↓
    Agent
        ↓
    Tool Calls
        ↓
    Gets Data
        ↓
    More Reasoning
        ↓
    Final Answer

Example
    User:
        Find bugs in my GitHub repository.
        Normal LLM

    It says:
        Send me the code.

    Because it cannot access GitHub.

    Agent

    The agent can:

    1. Open GitHub
    2. Read repository
    3. Analyze code
    4. Run checks
    5. Generate report

    Result:
        Found 12 issues:
        - Missing error handling
        - SQL injection risk
        - Unused dependencies
        ...

        The agent actually performed actions.

=>What Makes an Agent?

Most agents have four parts:

1. LLM (Brain)

Examples:

OpenAI GPT models
Anthropic Claude
Google Gemini
xAI Grok
2. Memory

Stores:

Previous conversations
User preferences
Past actions
3. Tools

Examples:

Web Search
Database
GitHub
Email
Slack
Calendar
Filesystem
4. Planning

The agent decides:

What should I do first?
Which tool should I use?
Do I need more information?


? Reiforcement Learning (RL)

    Reinforcement Learning (RL) is a type of machine learning where an 
    agent learns by interacting with an environment and receiving 
    rewards or penalties for its actions.

Think of it as:
    Learning through trial and error.

Simple Example: Teaching a Dog

    Suppose you're training a dog.

=>  Action
        Dog sits.

    Reward
        You give a treat.

    Sit → Treat → Dog more likely to sit again

=>   Wrong Action
        Dog jumps on guests.

    Penalty
        No treat.

    Jump → No reward → Dog less likely to jump

    Over time, the dog learns which actions maximize rewards.

This is the basic idea behind Reinforcement Learning.


? Chain of Thought (CoT)

=>Chain of Thought (CoT) is a technique where a model reasons
 through a problem step by step before producing an answer.

Instead of:
    Question → Answer

it becomes:
    Question → Intermediate Reasoning → Answer

Simple Example
    Without Chain of Thought
    Question:
        Roger has 5 apples.
        He buys 3 more.
        How many apples does he have?

    Answer:
        8

    With Chain of Thought

    Roger starts with 5 apples.
    He buys 3 more apples.
    5 + 3 = 8.
    Answer: 8

The reasoning process is explicit.

? reasoning models

 Reasoning models are AI models that are specifically trained and optimized to handle complex, multi-step problems better than traditional chat models.

Think of it like this:

Regular Chat Model

Good at:

Writing
Summarizing
Explaining concepts
Generating code
Conversations
Question
   ↓
Answer
Reasoning Model

Good at:

Math
Algorithms
Debugging
Planning
Scientific problems
Complex coding tasks
Question
   ↓
Analyze
   ↓
Break into steps
   ↓
Check logic
   ↓
Answer   

? Multi-model models
A multimodal model can understand and work with multiple 
types of data (modalities), such as:

Text
Images
Audio
Video

Instead of only processing text, it can combine information 
from different sources.


?Small Language Models (SLMs)

Small Language Models (SLMs) are language models that have far 
fewer parameters than large language models (LLMs), 
making them faster, cheaper, and easier to run.

Think of it like this:

Type	                       Analogy
Small Language Model (SLM)	   Motorcycle
Large Language Model (LLM)	   Truck

A truck can carry more, but a motorcycle is cheaper, 
faster, and easier to operate.


? Distillation

=>Distillation (more precisely, model distillation or knowledge distillation) is a technique where a smaller model learns from a larger, more capable model.

Think of it as:

Expert Teacher Model
          ↓
      Teaching
          ↓
Student Model

The goal is to make the smaller model nearly as capable as the larger one while being:

Faster
Cheaper
Smaller
Easier to deploy



?Quantization

=> Quantization is a technique used to make AI models smaller, 
faster, and more memory-efficient by reducing the precision of 
the numbers used to store the model's weights.

Simple Idea

A model contains billions of numbers (weights).

Normally they might be stored as:

32-bit floating point (FP32)

0.123456789
-1.987654321
5.123456789

These numbers consume a lot of memory.

With quantization:

8-bit integer (INT8)

12
-19
51

The numbers are represented with lower precision.


contex window 
SDK 
langchain
llm vs agents 
tokens 
types of promt  engineering 

