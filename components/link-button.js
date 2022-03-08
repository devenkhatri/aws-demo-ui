const LinkButton = (props) => {
    const variant = props.variant || 'primary';
    
    let variantClasses = 'bg-primary-500 hover:bg-primary-700 text-primary-100 hover:text-white border-primary-500 hover:border-primary-700';
    if(variant=='secondary') variantClasses = 'text-primary-500 hover:text-primary-700 bg-primary-100 hover:bg-white  border-primary-100 hover:border-primary-100';
    if(variant=='outline') variantClasses = 'text-primary-500 hover:text-primary-700 border-primary-500 hover:border-primary-700';
    return (
        <a 
            className={`inline-flex items-center border-0 py-1 px-3 border-2 focus:outline-none rounded text-base mt-4 md:mt-0 ${variantClasses}`}
            {...props}
        >
            {props.children}
        </a>
    );
}

export default LinkButton;