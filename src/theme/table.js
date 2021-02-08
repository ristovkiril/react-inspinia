import React, {Component} from 'react';
import { withTranslation } from 'react-i18next';

export class Table extends Component {

    getCategories = () => {
        return [...new Set(this.props.selected.map(row => row.category.name))]
    };

    getAnalysis = () => {
        if (this.props.isYearly){
            return [...new Set(this.props.selected.map(row => row.gas.name))]
        } else {
            return [...new Set(this.props.selected.map(row => row.year.year))]
        }
    };

    findByCategoryAndGas = (cat, gas) => {
        const row = this.props.selected
            .find((e) => e.category.name === cat && e.gas.name === gas);
        return row.concentrate.toFixed(2)
    };

    findByCategoryAndYear = (cat, year) => {
        const row = this.props.selected
            .find((e) => e.category.name === cat && e.year.year === year);
        return row.concentrate.toFixed(2)

    };



    render() {
        return (
            <table className="table table-hover table-responsive-lg">
                <thead className="bg-light m-0 p-0">
                <tr>
                    <th className="font-weight-bold">
                        {this.props.t('sectors.1')}
                    </th>
                    {
                        this.getAnalysis().map(analysis => <th key={analysis} className="font-weight-bold border-light border-left text-center">
                            {analysis}
                        </th>)
                    }
                </tr>
                </thead>
                <tbody>
                {
                    this.getCategories().map((category) =>
                        <tr key={category}>
                            <td className="bg-light font-weight-bold">
                                {this.props.t(category + '.1')}
                            </td>
                            {
                                this.getAnalysis().map(analysis =>
                                        <td key={analysis + category} className="border-light border-left text-center">
                                            { this.props.isYearly ?
                                                this.findByCategoryAndGas(category, analysis) : this.findByCategoryAndYear(category, analysis)
                                            }
                                        </td>
                                )
                            }
                        </tr>
                    )
                }

                </tbody>
            </table>
        )
    }
}
export default withTranslation() (Table);