import { Container } from "../components";
import { TypeAnimation } from 'react-type-animation';
const Home = () => {
    return <>
        <div className="w-full h-full py-8 text-center dark:bg-black dark:text-white">
                <Container>
                <TypeAnimation
                sequence={[
                    'Track, Learn, and Ace DSA!',
                    2000, 
                    'The Ultimate DSA Prep Tool.',
                    2000 ,
                    'DSA TRACKER',
                    3000
                ]}
                wrapper="span"
                speed={50}
                style={{ fontSize: '2em', display: 'inline-block' }}
                repeat={Infinity}
                />
                </Container>
            </div>
    </>
}

export default Home ; 