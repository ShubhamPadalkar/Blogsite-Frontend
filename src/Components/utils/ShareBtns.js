import {EmailIcon, EmailShareButton, FacebookIcon, 
    FacebookShareButton, LinkedinIcon, LinkedinShareButton,
     WhatsappIcon, WhatsappShareButton} from 'react-share'
import appUrl from './appURL'

const ShareBtns = ({title,imageurl,posturl,postbrief}) => {
    const postBaseUrl = appUrl + posturl
    postbrief = postbrief?.length > 150 ? postbrief.slice(0,100) + '...' : postbrief

return(
    <>
    <LinkedinShareButton
    title={title}
    source={postBaseUrl}
    summary={postbrief}
    url={postBaseUrl}
    >
    <LinkedinIcon size={50} />
    </LinkedinShareButton>

    <FacebookShareButton
    title={title}
    url={postBaseUrl}
    quote={postbrief}
    >
        <FacebookIcon size={50} />
    </FacebookShareButton>

    <WhatsappShareButton
    title={title}
    separator={postbrief}
    url={postBaseUrl}
    >
        <WhatsappIcon size={50}/>
    </WhatsappShareButton>

    <EmailShareButton
    subject={title}
    body={postbrief}
    url={postBaseUrl}
    >
        <EmailIcon size={50} />
    </EmailShareButton>

    </>
)
}

export default ShareBtns