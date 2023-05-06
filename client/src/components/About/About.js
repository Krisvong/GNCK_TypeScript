
import Container from 'react-bootstrap/Container'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

import "./About.css"

function About() {
    return (
        <div className="aboutpage">
            <Container style={{ color: "black" }}>
                <div className="card-deck">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">Casey</h5>
                            <p className="card-text">Hey I'm Casey. I have been a stay at home mom for a few years and now looking for a change of scenery! I enjoy technology and learning new skills as well as creating and fixing projects. I would love to pursue something with the car industry and software. Here's to a new journey!</p>
                            <div className="github-link">
                                <a href="https://github.com/wrxbeauty">
                                    <FontAwesomeIcon icon={faGithub} />
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">Nick</h5>
                            <p className="card-text">Nick has been working in IT for over 10 years. He is looking forward to making a career transition into software development, focusing on frontend specialties. When he's not learning new code, Nick enjoys playing guitar and chess, as well as working on projects outside.</p>
                            <div className="github-link">
                                <a href="https://github.com/nawright16">
                                    <FontAwesomeIcon icon={faGithub} />
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">Gregg</h5>
                            <p className="card-text">Gregg has spent the last many years opening and developing a venerable local eatery/institution, but has now decided to try his hand at a different kind of development.  He likes to debate matters of great import with his adult sons, and is obsessed with electrified stringed instruments.</p>
                            <div className="github-link">
                                <a href="https://github.com/GreggLedoux">
                                    <FontAwesomeIcon icon={faGithub} />
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">Kristen</h5>
                            <p className="card-text">Hi there! I am Kristen, a software developer. I am passionate about fitness, reading, and I love to learn about new technologies.</p>
                            <div className="github-link">
                                <a href="https://github.com/Krisvong">
                                    <FontAwesomeIcon icon={faGithub} />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    )
}

export default About;