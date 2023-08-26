import {render, screen} from '@testing-library/react';
import {Button} from 'shared/ui/Button/Button'; 

describe('button', () => { 
    test("show button", () => {
        render(<Button>Test</Button>);
        expect(screen.getByText("Test")).toBeInTheDocument()
    })
});