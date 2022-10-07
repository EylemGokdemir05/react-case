describe('[pages] - Home', () => {
    test('should render correctly',()=>{
        const view=setup();
        expect(view).toMatchSnapshot();
    });
});