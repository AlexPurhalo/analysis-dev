import { renderComponent, expect } from '../test_helper';
import SimpleAnalysis from '../../src/components/analysis/simple_analysis';

describe('SimpleAnalysis', ()=> {
	let component;

	beforeEach(() => {
		component = renderComponent(SimpleAnalysis);
	});
	
	it('has the correct class', ()=> {
		expect(component).to.have.class('simple-analysis')
	});

	it('has a text area', ()=> {
		expect(component.find('textarea')).to.exist;
	});

	it('has a button', () => {
		expect(component.find('button')).to.exist
	});
});
