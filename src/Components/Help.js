const Title = ({ children }) =>
    <h1>{ children }</h1>

const Paragraph = ({ children }) => 
    <p> { children } </p>

const Help = () =>
    <div className="">
        <Title>How does it work?</Title>        
        <Paragraph>
            This app allows you to evaluate your retirement plan in a simplified way.
            You input when you plan to retire, your current or initial capital to invest, 
            the monthly deposits before retirement and the monthly withdrawals from then up to
            a far away year. 
            Also, you need to provide the expected annual returns on the invested capital, which 
            can be around 7% after inflation if you invest broad market index fund. 
            Then you can see the evolution of your investments, and the power of compounding!
        </Paragraph>
        <Paragraph>
            Often these computations are made 
            under the assumption of a constant annual returns on your investments, 
            for instance around 7% (after inflation). 
            However, the reality is quite different: 
            hardly any year the returns yield an actual 7%.
            For instance, the annual returns of the S&P 500 look like
            1.38% (2015), -4.38% (2018) or 31.49% (2019).
        </Paragraph>
        <Paragraph>
            For this reason, a scenario where early years perform much worse or better
            will have an important impact in our portfolio.
            Therefore, this calculator runs a set of 1000 simulations
            with random yearly returns according to the normal distribution of expected returns.
            Then analyzes the outcomes giving answer to a key question: 
            what's the probability of not running short of money in retirement?
        </Paragraph>
    </div>

export default Help