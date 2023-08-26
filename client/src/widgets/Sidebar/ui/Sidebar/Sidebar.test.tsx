import { render, screen} from '@testing-library/react';
 import {Sidebar} from 'widgets/Sidebar/ui/Sidebar/Sidebar';
 
 describe('Sidebar', () => { 
    test( 'show sidebar', () => { 
        render(<Sidebar />);
        expect (screen.getByTestId('sidebar')).toBeInTheDocument() 
    });
 }); ;