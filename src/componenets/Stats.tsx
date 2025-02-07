import React from 'react'

function Stats() {
    return (
        <section id="stats">
            <article>
                <h5>Statistics</h5>
                <p></p>
            </article>
            <article>
                <h5>About the test</h5> //lol
                <p>This is a simple tool to measure your reaction time.</p><p>The average (median) reaction time is 273 milliseconds, according to <a href="/tests/reactiontime/statistics" title="Reaction Time Statistics">the data</a> collected so far.</p><p>In addition to measuring your reaction time, this test is affected by the latency of your computer and monitor. Using a fast computer and low latency / high framerate monitor will improve your score.</p><p>Scores in this test are faster than the <a href="/tests/aim">aim trainer</a> test, because you can react instantly without moving the cursor.</p><p>This is discussed in further detail on the the <a href="/tests/reactiontime/statistics" title="Reaction Time Statistics">statistics</a> page. While an average human reaction time may fall between 200-250ms, your computer could be adding 10-50ms on top. Some modern TVs add as much as 150ms!</p><p>Other tools: <b><a target="_blank" href="https://hardwaretester.com/gpu">What's My GPU?</a></b></p><p>If you want, you can keep track of your scores, and see your full history of reaction times.<br />Just perform at least 5 clicks and then save.</p>
            </article>
        </section>
    )
}

export default Stats