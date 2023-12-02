




const SectionTitel = ({subHeading,Heading}) => {
    return (
        <div className="text-center my-5">
            <p className='text-red-600 text-2xl'>{subHeading}</p>
            <h1 className="text-4xl font-semibold font-serif text-orange-400 uppercase">{Heading}</h1>
        </div>
    );
};

export default SectionTitel;