module.exports = componentName => ({
    content: `// Generated with util/create-new-component.js
import React from 'react';
import PropTypes from 'prop-types';
import styles from './${componentName}.scss';
      
const ${componentName} = props => {
    return (
        <div data-testid="${componentName}" className={styles.wrapper}>New Component : {props.title}</div>
    );
};
      
${componentName}.defaultProps = {
    title: ''
};
      
${componentName}.propTypes = {
    title: PropTypes.string.isRequired
};
      
export default ${componentName}; 
`,
    extension: `.jsx`,
});
